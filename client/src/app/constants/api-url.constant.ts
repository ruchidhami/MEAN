export class ApiUrlConstant {

  //Authorization
  public static USER_LOGIN: string = '/login';

  public static FETCH_ALL_USER(): string {
    return `/users`;
  }

  public static SEARCH_USER(): string {
    return `/search`;
  }

  public static CREATE_USER(): string {
    return `/users`;
  }

  public static FETCH_USER(id): string {
    return `/users/${id}`;
  }


  public static UPDATE_USER(id): string {
    return `/users/${id}`;
  }

}
