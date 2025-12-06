export type ApiOptions = {
  search?: string;
  status?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;

  [key: string]: any; 
};

export class ApiQueryBuilder<T extends ApiOptions = ApiOptions> {
  protected params: URLSearchParams;
  protected options: T;

  constructor(options: T) {
    this.options = options;
    this.params = new URLSearchParams();
  }

  protected appendDefaults(): void {
    const { search, sortBy, sortDir, page, pageSize, status } = this.options;

    if (search) this.params.set("search", search);
    if (sortBy) this.params.set("sort", sortBy);
    if (sortDir) this.params.set("sort", `${sortBy}:${sortDir}`);
    
    if (page !== undefined) this.params.set("page", String(page));
    if (pageSize !== undefined) this.params.set("pageSize", String(pageSize));

    // Your custom Status logic
    if (status && status !== "all") {
      this.params.set("isActive", (status === "active").toString());
    }
  }

  protected appendCustom(): void {}

  public build(): string {
    this.appendDefaults();
    this.appendCustom();
    
    const queryString = this.params.toString();
    return queryString ? `?${queryString}` : "";
  }
}