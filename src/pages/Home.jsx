import React, { useEffect, useState } from 'react'

import Articles from '../components/Articles'
import { Link } from 'react-router-dom'

function Home() {
	return (
		<>
			<h1 className="mt-2">Home</h1>

			<Link to="/blog">Blog</Link>

			<Articles />
		</>
	)
}

export default Home