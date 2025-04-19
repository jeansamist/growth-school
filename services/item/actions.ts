"use server";
import { Ebook } from "@/app/generated/prisma";
import { axiosInstance } from "@/lib/axios-instance";
import prisma from "@/lib/prisma";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

const upload = async (file: Blob) => {
  const form = new FormData();
  form.append("file", file);

  try {
    const relativePath = await axiosInstance.post<{
      status: boolean;
      data: { path: string };
    }>("/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return relativePath.data.data.path;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        errors: [error.response?.data.message],
      };
    } else {
      return {
        errors: ["Something went wrong. Please try again later."],
      };
    }
  }
};

const storeCover = async (cover: FormDataEntryValue | null) => {
  // Upload cover file
  if (!cover || !(cover instanceof Blob)) {
    throw new Error("No cover file provided. File missing or invalid");
  }
  const resCoverRelativePath = await upload(cover);
  return (process.env.NEXT_PUBLIC_API || "") + resCoverRelativePath;
};

const storeEbook = async (ebook: FormDataEntryValue | null) => {
  // Upload ebook file
  if (!ebook || !(ebook instanceof Blob)) {
    throw new Error("No ebook file provided. File missing or invalid");
  }
  const resEbookRelativePath = await upload(ebook);
  return (process.env.NEXT_PUBLIC_API || "") + resEbookRelativePath;
};

const storeTags = async (tags: string, cover?: string) => {
  const tagArray = tags.split(",");
  const tagData = tagArray.map((tag) => ({ name: tag, cover: cover || "" }));
  return await prisma.tag.createManyAndReturn({
    data: tagData,
    skipDuplicates: true,
  });
};

export async function createItem(
  formState: { errors: string[] },
  formData: FormData
) {
  // try {
  const coverPath = await storeCover(formData.get("cover"));
  // Upload ebook file
  const ebook = formData.get("ebook");
  let ebookPath = null;
  if (ebook) {
    ebookPath = await storeEbook(ebook);
  }
  const storedTags = await storeTags(formData.get("tags") as string, coverPath);
  // store item
  const rawTitle = formData.get("title") as string;
  const rawPrice = parseInt(formData.get("price") as string);
  const rawDiscount = parseInt(formData.get("discount") as string);
  const rawDescription = formData.get("description") as string;
  const rawCategoryId = parseInt(formData.get("category_id") as string);
  const rawAuthor = formData.get("author") as string;
  const rawIsbn = formData.get("isbn") as string;
  const rawLanguage = formData.get("language") as string;
  const rawPages = parseInt(formData.get("pages") as string);
  const rawEdition = formData.get("edition") as string;
  const rawDate = formData.get("date") as string;
  const rawFile = formData.get("file_link") as string;
  const rawModules = formData.get("modules") as string;

  const rawTestimonials = formData.get("testimonials") as string;
  const testimonials = rawTestimonials.split(",");
  if (!rawTitle || isNaN(rawPrice) || isNaN(rawCategoryId)) {
    return { errors: ["Invalid title, price or category."] };
  }
  const rawNames = formData.get("names") as string;
  const names = rawNames.split(",");
  if (rawCategoryId === 2) {
    await prisma.item.create({
      data: {
        title: rawTitle,
        description: rawDescription || "",
        price: rawPrice,
        cover: coverPath,
        discount: isNaN(rawDiscount) ? 0 : rawPrice - rawDiscount,
        ebook: {
          create: {
            author: rawAuthor || "",
            isbn: rawIsbn || "",
            language: rawLanguage || "",
            pages: isNaN(rawPages) ? 0 : rawPages,
            edition: rawEdition || "",
            date: rawDate || "",
          },
        },
        testimonials: {
          createMany: {
            data: testimonials.map((testimonial) => ({
              name: names[testimonials.indexOf(testimonial)],
              message: testimonial,
            })),
          },
        },
        tags: {
          createMany: {
            data: storedTags.map((tag) => ({ tagId: tag.id })),
            skipDuplicates: true,
          },
        },
        category: {
          connect: {
            id: rawCategoryId,
          },
        },
        files: {
          create: {
            url: ebookPath || rawFile,
            title: rawTitle, // fallback title
          },
        },
      },
    });

    redirect(`/`);
  }
  await prisma.item.create({
    data: {
      title: rawTitle,
      description: rawDescription || "",
      price: rawPrice,
      cover: coverPath,
      discount: isNaN(rawDiscount) ? 0 : rawPrice - rawDiscount,
      training: {
        create: {
          modules: rawModules || "",
        },
      },
      testimonials: {
        createMany: {
          data: testimonials.map((testimonial) => ({
            name: names[testimonials.indexOf(testimonial)],
            message: testimonial,
          })),
        },
      },
      tags: {
        createMany: {
          data: storedTags.map((tag) => ({ tagId: tag.id })),
          skipDuplicates: true,
        },
      },
      category: {
        connect: {
          id: rawCategoryId,
        },
      },
      files: {
        create: {
          url: ebookPath || rawFile,
          title: rawTitle, // fallback title
        },
      },
    },
  });

  redirect(`/`);
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     return {
  //       errors: [error.response?.data.message],
  //     };
  //   }
  //   console.log(error);

  //   return {
  //     errors: [
  //       "Something went wrong. Please try again later.",
  //       JSON.stringify(error),
  //     ],
  //   };
  // }
}
