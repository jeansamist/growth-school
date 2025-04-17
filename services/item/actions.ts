"use server";
import { axiosInstance } from "@/lib/axios-instance";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createItem(
  formState: { errors: string[] },
  formData: FormData
) {
  console.log(formData);

  // Upload cover file
  const cover = formData.get("cover");
  if (!cover || !(cover instanceof Blob)) {
    return {
      errors: ["We cannot upload cover file. File missing or invalid."],
    };
  }

  const coverForm = new FormData();
  coverForm.append("file", cover);

  const resCoverRelativePath = await axiosInstance.post<{
    statut: boolean;
    data: { path: string };
  }>("/upload", coverForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!resCoverRelativePath.data.statut) {
    console.log(resCoverRelativePath);
    return { errors: ["We cannot upload cover file"] };
  }

  const coverPath =
    "https://growth-school-adonisjs.onrender.com/" +
    resCoverRelativePath.data.data.path;

  let filesRelativePaths: string[] = [];
  if (formData.get("files_links")) {
    const filesLinks = formData.getAll("files_links") as unknown as string;
    filesRelativePaths = filesLinks.split(",");
  } else {
    const fileLink = formData.getAll("file_link") as unknown as string;
    filesRelativePaths = [fileLink];
  }
  // store tags
  const tags = formData.get("tags") as string;
  const tagArray = tags.split(",");
  const tagData = tagArray.map((tag) => ({ name: tag, cover: coverPath }));
  const storedTags = await prisma.tag.createManyAndReturn({
    data: tagData,
    skipDuplicates: true,
  });

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

  if (!rawTitle || isNaN(rawPrice) || isNaN(rawCategoryId)) {
    return { errors: ["Invalid title, price or category."] };
  }

  const itemData = {
    title: rawTitle,
    description: rawDescription || "",
    price: rawPrice,
    cover: coverPath,
    discount: isNaN(rawDiscount) ? 0 : rawPrice - rawDiscount,
    author: rawAuthor || "",
    isbn: rawIsbn || "",
    language: rawLanguage || "",
    pages: isNaN(rawPages) ? 0 : rawPages,
    edition: rawEdition || "",
    date: rawDate || "",
  };

  const d = await prisma.item.create({
    data: {
      ...itemData,
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
        createMany: {
          data: filesRelativePaths.map((file, id) => ({
            url: file,
            title: id.toString() + " - " + rawTitle, // fallback title
          })),
        },
      },
    },
  });

  console.log(d);
  redirect(`/`);
}
