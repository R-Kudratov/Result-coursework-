import { useMemo, useState, useEffect } from 'react'
import { useServerRequest } from '../../hooks'
import { PostCard, Pagination, Search } from './components'
import { PAGINATION_LIMIT } from '../../constants'
import { getLastPageFromLinks, debounce } from './utils'
import styled from 'styled-components'
import { set } from 'react-hook-form'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [shouldSearch, setShouldSearch] = useState(false)
	const [searchPhrase, setSearchPhrase] = useState('')
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ response: { posts, links } }) => {
				setPosts(posts)
				setLastPage(getLastPageFromLinks(links))
			},
		)
	}, [requestServer, page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const handleSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search
					handleSearch={handleSearch}
					searchPhrase={searchPhrase}
					setShouldSearch={setShouldSearch}
				/>
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	)
}

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	min-height: 100%;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-posts-found {
		font-size: 24px;
		margin-top: 40px;
		text-align: center;
	}
`
