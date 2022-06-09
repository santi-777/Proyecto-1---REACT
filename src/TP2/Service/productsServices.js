import firebase from "../Config/firebase"
export async function getAllProductos(buscar){
    let aDatos=[];
    const querySnapshot = await firebase.firestore().collection("productos")
    .orderBy('title')
    .get()
    if ( querySnapshot.docs.length > 0 )
    {
        for (var i = 0; i < querySnapshot.docs.length; i++) {
            if (querySnapshot.docs[i].data().info.search(buscar) >=0 )
            {    
                aDatos.push(querySnapshot.docs[i]);
            }
        } 
    }

    return aDatos;
}
export async function getByIdProductos(id){
    return await firebase.firestore().doc("productos/"+id).get()
}
export async function update(id,data){
    return await firebase.firestore().doc("productos/"+id).set(data)
}