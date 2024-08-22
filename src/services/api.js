import axios from "axios";

const API_URL = "http://localhost:1337/api/articles";

const API_URL_CAT = "http://localhost:1337/api/categories";

export const fetchArticles = async (pageNumber, itemsPerPage) => {
  try {
    const response = await axios.get(
      `${API_URL}/?page=${pageNumber}&limit=${itemsPerPage}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Data not found...");
  }
};

export const fetchArticlespagination = async (pageNumber1, itemsPerPage1) => {
  try {
    const response = await axios.get(
      `${API_URL}?populate=*&pagination[page]=${pageNumber1}&pagination[pageSize]=${itemsPerPage1}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Data not found...");
  }
};

export const fetchAllArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Data not found...");
  }
};

export const fetchSingleArticle = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}?populate=*&`);
    return response.data.data;
  } catch (error) {
    throw new Error("Data not found...");
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL_CAT}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Data not Found");
  }
};

export const fetchSingleCategory = async (slug) => {
  try {
    const response = await axios.get(
      `${API_URL_CAT}?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Data Not Found");
  }
};

// export const fetchArticleCount = async () => {
// 	const response = await axios.get(`${API_URL}/count`);
// 	return response.data;
//   };
