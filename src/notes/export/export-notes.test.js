import { getBlob, getFilename } from "./export-notes";

test("getBlob", () => {
  const txtBlob = getBlob("This is content", "txt");
  expect(txtBlob.size).toBe("This is content".length);
  expect(txtBlob.type).toBe("text/plain");

  const mdBlob = getBlob("This is content", "md");
  expect(mdBlob.size).toBe("This is content".length);
  expect(mdBlob.type).toBe("text/markdown");
});

test("getFilename", () => {
  expect(getFilename("Amazon shopping", "txt")).toBe("Amazon shopping.txt");
  expect(getFilename("Amazon shopping", "md")).toBe("Amazon shopping.md");

  expect(getFilename("      Amazon      shopping         ", "txt")).toBe("Amazon shopping.txt");
  expect(getFilename("? < > Amazon / \\ shopping \"  :?* ", "txt")).toBe("Amazon shopping.txt");
});
