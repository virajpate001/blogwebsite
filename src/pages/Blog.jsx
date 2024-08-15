import React from 'react'
import Articles from '../components/Articles'
import Breadcrumb from '../components/Breadcrumb'
import Filter from '../components/Filter'

function Blog() {
	return (
		<>
			{/* <img src={bgimg} alt="" /> */}

			<Breadcrumb pagename="Blog" />
			<Filter />
			<Articles />
		</>
	)
}

export default Blog