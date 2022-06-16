import useFetch from '../../hooks/useFetch'

const Content = () => {
  const data = useFetch('https://jsonplaceholder.typicode.com/users')

  return (
    <div className="Content" data-testid="Content">
      {data.status === 'fetched' && data.data.map(d => <p key={d.id}>{d.name}</p>)}
    </div>
  )
}

export default Content

