import axios from "axios";

const API_URL = "http://localhost:1337/api/articles";

const API_URL_CAT = "http://localhost:1337/api/categories";

const API_URL_TAGS = "http://localhost:1337/api/tags";

export const fetchArticles = async (pageNumber, itemsPerPage) => {
  try {
    const response = await axios.get(
      `${API_URL}/?page=${pageNumber}&limit=${itemsPerPage}&populate=*`
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

export const fetchSingleArticle = async (slug) => {
  try {
    const response = await axios.get(
      `${API_URL}?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data.data[0];
  } catch (error) {
    throw new Error("Data not found...");
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL_CAT}?populate=*`);
    return response.data.data;
  } catch (error) {
    throw new Error("Data not Found");
  }
};

export const fetchTags = async () => {
  try {
    const response = await axios.get(`${API_URL_TAGS}?populate=*`);
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

export const fetchSingleTag = async (slug) => {
  try {
    const response = await axios.get(
      `${API_URL_TAGS}?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Data Not Found");
  }
};

export const fetchRecentArticles = async () => {
  try {
    const response = await axios.get(
      `${API_URL}?sort[0]=publishedAt:desc&pagination[limit]=5&populate=*`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Data Not Found");
  }
};
