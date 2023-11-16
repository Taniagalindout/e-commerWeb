import { useState,useEffect } from "react";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Container } from "react-bootstrap";
import {v4} from 'uuid';
const ImagesFirebase = () => {
    const [imageUpload, setImageUpload] = useState(null);
   
    const uploadImage = async () => {
        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            alert('Image uploaded successfully');

            const downloadURL = await getDownloadURL(imageRef);

            const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYW1jQGdtYWlsLmNvbSIsImlhdCI6MTcwMDEwMzE2MiwiZXhwIjoxNzAyNjk1MTYyfQ.2yaM7UclTMjW35Z3lM-F31tKQNUmA-N_jzk3ACh4PE408U6l2t1s6qiukVWAr23guAiZCLGU8OH7K2qMFQRN_w";

            const productData = {
                name: 'Juguete 2',
                price: '12.0',
                quantity_available: 14,
                tags: 'Hola',
                id_category: 1,
                id_seller: 1,
                description: `Enlace de la imagen: ${downloadURL}`,
                category: null,
                seller: null,
                imageLinks: null,
                orderItems: null

            };
            console.log(productData);
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYW1jQGdtYWlsLmNvbSIsImlhdCI6MTcwMDEwMzE2MiwiZXhwIjoxNzAyNjk1MTYyfQ.2yaM7UclTMjW35Z3lM-F31tKQNUmA-N_jzk3ACh4PE408U6l2t1s6qiukVWAr23guAiZCLGU8OH7K2qMFQRN_w',
                    'Access-Control-Allow-Origin': "*"
                },
                body: JSON.stringify(productData)

            });

            if (response.ok) {
                console.log('Datos enviados correctamente');
            } else {
                console.error('Error al enviar los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la subida o solicitud:', error);
        }
    };



    return (
        <Container className="mt-5">
            <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]); }} />
            <button onClick={uploadImage}>Subir</button>
        </Container>
    );
};

export default ImagesFirebase;
