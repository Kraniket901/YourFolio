import Layout from "@/components/Layout";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage(){
    const router = useRouter();
    const [productInfo,setProductInfo] = useState();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response=>{
            setProductInfo(response.data);
        });
    },[id]);
    function goBack(){
        router.push('/');
    }
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack();
    }
    return(
        <Layout>
            <div className="front-outer-border3">
             <h1>Do You Really Want to Delete&nbsp;<b>&quot;{productInfo?.name}&quot;</b> ?</h1>
             <div className="front-btn-div">
             <Button onClick={deleteProduct} ghost className="mr-2" auto size="sm"color="error">Yes</Button>
             <Button onClick={goBack} ghost className="mr-2" auto size="sm" color="primary">No</Button>
             </div>
            </div>
        </Layout>
    )
}