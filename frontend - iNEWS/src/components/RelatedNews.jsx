import React from 'react'
import List from './List'
import ListItem from './ListItem'

const RelatedNews = ({ articles }) => {
  return (
    <div className="divide-y divide-slate-600">
      <nav className="py-4 px-6 text-sm font-medium">
        <ul className="flex space-x-3">
          <li>
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-white`}>
              Top 5 Related News
            </a>
          </li>
        </ul>
      </nav>

      <List>
        {articles.map((article) => (
          <ListItem key={article.id} article={article} />
        ))}
      </List>
    </div>
  )
}

export default RelatedNews