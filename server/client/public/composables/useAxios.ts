import axios from 'axios';

export default function useAxios() {

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
      data: any
  ): Promise<Object> {
    try {
      let endpoint = `/api/${type}/create`;
      if (id.value !== 'new') {
        endpoint = `/api/${type}/${id.value}/update/`;
      }
      const response = await axios.post(endpoint, data.value);
    } catch (error) {
        console.log("In Composable:", error);
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