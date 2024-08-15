import React, { useEffect, useState } from 'react'
import { fetchAllArticles } from '../services/api'

function Pagination({ onPageChange, pageSize, cpage }) {
	const [articlesall, setArticlesAll] = useState([])

	useEffect(() => {
		const getAllArticles = async () => {
			try {
				const articles = await fetchAllArticles()
				setArticlesAll(articles)
			} catch (error) {
				console.log(error)
			}
		}
		getAllArticles()
	}, [])

	const totalPages = Math.ceil(articlesall.length / pageSize)

	const renderpaginationLinks = () => {
		return Array.from({ length: totalPages }, (_, i) => i + 1).map(
			(pageNumber) => (
				<li
					className={pageNumber === cpage ? 'active' : ''}
					key={pageNumber}
				>
					<button
						className="h-9 w-9"
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</button>
				</li>
			)
		)
	}

	return (
		<>
			<div className="flex items-center justify-center gap-4 mt-12">
				<div className="prev">
					<button
						onClick={() => onPageChange(cpage - 1)}
						disabled={cpage === 1}
						className="rounded-full bg-purple-600 px-5 py-1 text-white disabled:hidden"
					>
						Previous
					</button>
				</div>

				<div>
					<ul className="flex">{renderpaginationLinks()}</ul>
				</div>

				<div className="next">
					<button
						onClick={() => onPageChange(cpage + 1)}
						disabled={cpage === totalPages}
						className="rounded-full bg-purple-600 px-5 py-1 text-white disabled:hidden"
					>
						Next
					</button>
				</div>
			</div>
		</>
	)
}

export default Pagination