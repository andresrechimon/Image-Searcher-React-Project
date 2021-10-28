import React, {useState,useEffect , Fragment} from 'react';
import Form from './components/Form';
import ImgList from './components/ImgList';

function App() {
  //App state
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [totalpage, setTotalPage] = useState(1);

  useEffect(() => {
    const consultAPI = async () =>{
      if(search === '') return;

      const imagesPerPage = 30;
      const key = '24080097-0acc7e3aebefd627ef6cbaf53';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentpage}`;

      const answer = await fetch(url);
      const result = await answer.json();

      setImages(result.hits);

      //Calculate total of pages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPage(calculateTotalPages);

      //Move up screen
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultAPI();
  }, [search, currentpage]);

  //Defining last page to go back
  const lastPage = () => {
    const newCurrentPage = currentpage - 1; 

    if(newCurrentPage === 0) return;

    setCurrentPage(newCurrentPage);
  }

  //Defining next page to go foward
  const nextPage = () => {
    const newCurrentPage = currentpage + 1; 

    if(newCurrentPage > totalpage) return;

    setCurrentPage(newCurrentPage);
  }

  return (
    <Fragment>
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Form
        setSearch={setSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ImgList
        images={images}
        />

        {(currentpage === 1) ? null : 
        (<button 
        type="button"
        className="btn btn-info mr-1"
        onClick={lastPage}
        >&laquo; Anterior</button>)
        }

        {(currentpage === totalpage) ? null : (
        <button 
        type="button"
        className="btn btn-info"
        onClick={nextPage}
        >Siguiente &raquo;</button>
        )}

      </div>
    </div>

    
    </Fragment>
  );
}

export default App;
