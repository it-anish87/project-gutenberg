export type InputFilters = {
  bookIds?: number[];
  languages?: string[];
  mimeTypes?: string[];
  topics?: string[];
  authors?: string[];
  titles?: string[];
};

export type BooksInput = {
  page: number;
  perPage?: number;
  filters: InputFilters;
};
