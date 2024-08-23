import {  useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";

import { ProductCard } from "../../components";

export const CursoDetail = () => {
  const dispath = useDispatch();
  const [searchParams] = useSearchParams();
  const productoId = searchParams.get('productoId');
  //const [cant, setCant] = useState(1);
  //console.log(productoId);
  //const refCant = useRef();
  const [producto,setProducto] = useState({});
  const [curso, setCurso] = useState({});
  //const [productList,setProductList] = useState([]);

  useEffect(()=>{
    try {
      const fetchProducto = async() => {
        const resultFromApi = await fetch(`https://localhost:7164/api/Producto/getProducto/${productoId}`,{
          method:'GET',
          credentials : 'include',
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        });
  
        const resultFetch = await resultFromApi.json();
        console.log(resultFetch);
        setProducto(resultFetch.result);
      }
      fetchProducto();
    } catch (error) {
      console.error(error);
    }
  },[productoId])


  useEffect(()=>{
      
      try {
          
          const fetchCurso = async() =>  {
            const resultFromApi = await fetch(`https://localhost:7164/api/Course/getCourseCode?codigo=${producto.codigo}`,{
              method:'GET',
              credentials : 'include',
              headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
              }
            });
        
            const resultFetch = await resultFromApi.json();
            console.log(resultFetch);
            setCurso(resultFetch.result);
          }
          
          fetchCurso();
          
        } catch (error) {
          console.error(error);
        }
  },[producto])

  const handleAddToCart = (itemProd) => {
    let objetoCart = {
      id: itemProd.id,
      codigo: itemProd.codigo,
      imagen: itemProd.imagenUrl,
      titulo: itemProd.titulo,
      precio : itemProd.precio,
      cantidad : 1,
      tipo : itemProd.tipo,
    }

    dispath(addToCart(objetoCart));

    toast.success(`Se agregó el ${itemProd.tipo} de ${itemProd.titulo} a su carrito`);
  }
  
  return (
    <div>CursoDetail</div>
  )
}
