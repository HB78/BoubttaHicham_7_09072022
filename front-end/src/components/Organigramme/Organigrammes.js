import React from 'react';
import OrganigrammeComponent from "./../Organigramme/organigramme/OrganigrammeComponent";
import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader/Loader';

function Organigrammes({ data }) {
  const [search, setSearch] = useState("")
  console.log('search:', search)

  const userSearched = (e) => {
    setSearch(e.target.value)
  }

  const searchItem = data.filter((item) => {
    if (search === "") {
      return ''
    } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return item
    }

  })

  function DisplayUsers() {
    return (
      <OrganigrammeComponent item={searchItem} />
    )
  }

  return (
    <>
      {data.length > 0 ?
        <>
          <Header />
          <main className="container_flip">
            <h1 className="organigramme">ORGANIGRAMME</h1>
            <input type="search"
              name="recherche"
              id="searchBar"
              placeholder="Rechercher un de nos membres"
              onChange={userSearched} />
            <section className="container_flip_card">
              <DisplayUsers />
            </section>
          </main>
          <Footer />
        </>

        : <Loader />}
    </>
  )
}

export default Organigrammes
