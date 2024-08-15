import axios from 'axios'

const API_URL = 'https://66b1d03d1ca8ad33d4f54417.mockapi.io/blog/myblog'

export const fetchArticles = async (pageNumber, itemsPerPage) => {
	try {
		const response = await axios.get(
			`${API_URL}/?page=${pageNumber}&limit=${itemsPerPage}`
		)
		return response.data
	} catch (error) {
		throw new Error('Data not found...')
	}
}

export const fetchAllArticles = async () => {
	try {
		const response = await axios.get(
			`${API_URL}`
		)
		return response.data
	} catch (error) {
		throw new Error('Data not found...')
	}
}

export const fetchSingleArticle = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`)
		return response.data
	} catch (error) {
		throw new Error('Data not found...')
	}
}