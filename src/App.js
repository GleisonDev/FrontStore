import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './formulario';
import Tabela from './Tabela';


function App() {

  // Objeto produto
  const produto = {
    id: 0,
    name: '',
    brand: ''
  }

  // UserState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);
  //UserEffect
  useEffect(() => {
    fetch("http://localhost:8080/list")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido))
  }, []);

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  // Cadastrar produtos
  const cadastrar = () => {
    fetch('http://localhost:8080/register', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'

      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        console.log(retorno_convertido)
      })
  }
  // Retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} />
      <Tabela vetor={produtos} />
    </div>
  );
}

export default App;
