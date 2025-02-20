const server_url = "http://localhost:5000/todos";

export type Todo = {
  id: number;
  title: string;
  completed:boolean;
};

export type TodoRequest = {
  title:string;
  completed:boolean;
};

export async function get():Promise<Array<Todo>> {
  try {
    const response = await fetch(server_url);

    if (!response.ok) {
      throw new Error(`error`);
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    throw new Error("error");
  }
}

export async function get_by_id(id: number):Promise<Todo> {
    try {
    const response = await fetch(`${server_url}/${id}`);

    if (!response.ok) {
      throw new Error(`error`);
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    throw new Error("error");
  }

}

export async function create(request: TodoRequest):Promise<Todo> {
    try {
    const response = await fetch(server_url, {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`error`);
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    throw new Error("error");
  }
}

export async function update(id: number, request: TodoRequest):Promise<Todo> {
    try {
    const response = await fetch(`${server_url}/${id}`, {
      method: "PUT",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`error`);
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    throw new Error("error");
  }
}

export async function remove(id: number):Promise<number> {
    try {
    const response = await fetch(`${server_url}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`error`);
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    throw new Error("error");
  }
}

