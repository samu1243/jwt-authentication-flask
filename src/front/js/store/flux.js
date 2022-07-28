const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getToken: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      login: async (data) => {
        let response = await fetch(
          "https://3001-4geeksacade-reactflaskh-spftw6tlsnv.ws-us54.gitpod.io/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          let data = await response.json();
          sessionStorage.setItem("token", data.token);
          return true;
        } else return false;
      },
      signup: async (data) => {
        let response = await fetch(
          "https://3001-4geeksacade-reactflaskh-spftw6tlsnv.ws-us54.gitpod.io/api/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        console.log(response.status);
        if (response.status == 200) {
          let data = await response.json();
          sessionStorage.setItem("token", data.token);
          return true;
        } else return false;
      },

      privateUser: async () => {
        let response = await fetch(
          "https://3001-4geeksacade-reactflaskh-spftw6tlsnv.ws-us54.gitpod.io/api/private",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        let data = await response.json();
      },

      getUser: async () => {
        const response = await fetch(
          "https://3001-4geeksacade-reactflaskh-spftw6tlsnv.ws-us54.gitpod.io/api/users",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        const data = await response.json();
        setStore({ data: data });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("login out");
        setStore({ token: null });
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
