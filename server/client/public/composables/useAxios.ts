import axios from 'axios';

export default function useAxios() {

  async function getAll(type: string): Promise<Object> {
    try {
      let endpoint = `/api/${type}/all`;
      let response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getItem(type: string, id: string|number): Promise<Object> {
    try {
      let endpoint = `/api/${type}/${id}/get/`;
      let response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function postForm(
      type: any,
      id: any,
      data: any
  ): Promise<Object> {
    try {
      if (id.value == 'new') {
        let response = await axios.post(`/api/${type}/create`, data.value);
        return response.data;
      } else {
        let response = await axios.put(`/api/${type}/${id.value}/update/`, data.value);
        return response.data;
      }
    } catch (error) {
        console.log("In Composable:", error);
        throw error;
      // Handle 422 status as success and return validation errors
      // if (error.status === 422) {
      //   // Assuming the validation errors are in the response.data.errors field
      //   // Adjust this based on your actual API response structure
      //   return Promise.reject({
      //     status: 200, // Treat as success
      //     data: response.data.errors, // Return validation errors
      //   });
      }
    }

 return {
    getAll,
    getItem,
    postForm,
  };
}