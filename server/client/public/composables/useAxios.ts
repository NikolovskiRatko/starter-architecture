import axios from 'axios';
import { useRouter } from "vue-router";

export default function useAxios() {
  const router = useRouter();

  axios.defaults.headers = {
    "Content-type": "application/json",
  };
  axios.defaults.withCredentials = true;
  axios.defaults.validateStatus = function (status) {
    return status === 401 || (status >= 200 && status < 300);
  };
  axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.data.error == "Unauthorized action") {
          const router = useRouter();
          router.push({
            name: "products",
          });
        }
        if (error.response.status == 422) {
          // console.log(error.response.)
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      },
  );

  async function getDatatableData(type: string): Promise<Object> {
    try {
      const endpoint = `/api/${type}/all`;
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getEntityById(type: string, id: string|number): Promise<Object> {
    try {
      const endpoint = `/api/${type}/${id}/get/`;
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function postForm(
      type: any,
      id: any,
      data: any,
      redirect: boolean,
      redirect_route: string = ''
  ): Promise<Object> {
    try {
      let endpoint = `/api/${type}/create`;
      if (id.value !== 'new') {
        endpoint = `/api/${type}/${id.value}/update/`;
      }
      const response = await axios.post(endpoint, data.value);

      if (redirect) {
        router.push(redirect_route);
      }
    } catch (error) {
      // Handle 422 status as success and return validation errors
      if (error.status === 422) {
        // Assuming the validation errors are in the response.data.errors field
        // Adjust this based on your actual API response structure
        return Promise.reject({
          status: 200, // Treat as success
          data: response.data.errors, // Return validation errors
        });
      }
      throw error;
    }
  }

 return {
    getDatatableData,
    getEntityById,
    postForm,
  };
}