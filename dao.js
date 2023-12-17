const { todoCollection, firestoreDB } = require('./db');
const { addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

const createData = async (data) =>{
    await addDoc(todoCollection, data);
}

const readAllData = async () =>{
    const snapshot = await getDocs(todoCollection);
    const list = snapshot.docs.map(doc => (
        {id : doc.id, ...doc.data()}
        ));
    return list;
}


const updateData = async (id, data) => {
    await updateDoc(doc(todoCollection, id), data);
}

const removeData = async (id) =>{
    await deleteDoc(doc(todoCollection, id));
}

const readData = async (id) =>{
    const docShot = await getDoc(doc(todoCollection, id));
    if (docShot.exists()) {
        return docShot.data();
    }else{
        console.log("no data in the specified location!");
    }
}

module.exports = {
    createData,
    readAllData,
    updateData,
    readData,
    removeData,
}