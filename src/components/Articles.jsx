import React, { useEffect, useState } from 'react'
import { fetchArticles } from '../services/api'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'

function Articles() {
	const [articles, setArticle] = useState([])
	const [error, setError] = useState('')
	const [cpage, setPage] = useState(1)
	const pageSize = 6

	useEffect(() => {
		const getArticle = async () => {
			try {
				const getarticles = await fetchArticles(cpage, pageSize)
				setArticle(getarticles)
			} catch (error) {
				setError(error.message)
			}
		}

		getArticle()
	}, [cpage, pageSize])

	const onPageChange = (pageNumber) => {
		setPage(pageNumber)
	}

	// loading and error code
	if (articles.length === 0 && !error) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<>
			<div className="m-auto w-11/12 ">
				<ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
					{articles.map((article) => {
						return (
							<li key={article.id}>
								<div className="rounded-xl shadow-md">
									<div className="relative">
										<Link to={`/post/${article.id}`}>
											<img
												src={article.img_url}
												alt={article.title}
												className="w-full h-60 aspect-square object-cover"
											/>
										</Link>
										<span className="category absolute left-2 top-2 rounded-3xl bg-yellow-400 px-3 py-0.5 text-sm">
											Industrial
										</span>
									</div>
									<Link to={`/post/${article.id}`}>
										<div className="px-4 py-6">
											<div className="mb-2 flex justify-between">
												<p className="name">
													Viraj Pate
												</p>
												<p className="date text-sm text-gray-500">
													May 20, 2021
												</p>
											</div>
											<div>
												<h2 className="text-lg font-medium leading-5">
													{article.title.slice(0, 60)}
													...
												</h2>
											</div>
										</div>
									</Link>
								</div>
							</li>
						)
					})}
				</ul>

				<Pagination
					onPageChange={onPageChange}
					pageSize={pageSize}
					cpage={cpage}
				/>
			</div>
		</>
	)
}

export default Articles