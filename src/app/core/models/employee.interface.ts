export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface TableSettings {
  columns: {
    [key: string]: {
      title: string;
      class?: string;
    };
  };
  actions: {
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
  pager: {
    display: boolean;
    perPage: number;
  };
}

export interface TodoList {
  userId: number;
  id: number;
  title: string;
  completed: string;
}
