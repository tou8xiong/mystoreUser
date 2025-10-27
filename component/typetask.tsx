"use client"
import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function TypeTasks() {

    const [users, setUsers] = useState<any[]>([]);
    const [newUser, setNewUser] = useState({ name: '', age: '' });
    const usersRef = collection(db, 'users');

    const fetchUsers = async () => {
        const snapshot = await getDocs(usersRef);
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(docs);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAdd = async () => {
        await addDoc(usersRef, {
            name: newUser.name,
            age: Number(newUser.age),
        });
        setNewUser({ name: '', age: '' });
        fetchUsers();
    };

    const handleUpdate = async (id: string) => {
        const userDoc = doc(db, 'users', id);
        await updateDoc(userDoc, { name: 'Updated Name' });
        fetchUsers();
    };

    const handleDelete = async (id: string) => {
        const userDoc = doc(db, 'users', id);
        await deleteDoc(userDoc);
        fetchUsers();
    };
    console.log( "this is the users length",users.length)

    return (
        <div className='font-serif flex justify-center bg-gradient-to-bl from-blue-400 to-amber-200 h-full'>
            <div className="p-6 border-0 border-sky-100 mt-20">
                <h2 className="text-5xl font-bold mb-4 text-center font-serif text-neutral-950 "> User List</h2>
                <div className="mb-4 space-x-2">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="border p-1"
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                        className="border p-1"
                    />
                    <button onClick={handleAdd} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Add User
                    </button>
                </div>
                <div className='font-bold'>User = <span className='text-amber-600'>{users.length}</span></div>
                <ul className="space-y-2 border-0 border-amber-50">
                    {users.map((user, index) => (
                        <li key={user.id} className="border p-2 rounded w-full flex items-center">
                            <span>{index + 1}.</span>
                            <span className='ml-2'>Name: <strong>{user.name}</strong> – Age: {user.age}</span>
                            <div className='ml-auto'>
                                <button onClick={() => handleUpdate(user.id)} className="text-sm text-green-600 mr-2">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="text-sm text-red-600">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Separate lists: Young (<20) and Older (>=20) */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-gray-300 p-3 rounded">
                        <h3 className="font-semibold mb-2">Young Users </h3>
                        {users.length === 0 && <p>No users available.</p>}
                        <div className='text-fuchsia-500'> Users  ={users.filter(u => Number(u.age) < 20).length }</div>
                        <ul className="space-y-1">
                            {users.filter(u => Number(u.age ) < 20).map((user ,index) => (
                               <li key={user.id} className="text-sm">
                                    {index +1 }.
                                    {user.name} - {user.age}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-2 border-gray-300 p-3 rounded">
                        <h3 className="font-semibold mb-2">Old Users </h3>
                        <div className='text-fuchsia-500'> User = {users.filter(u => Number(u.age) >= 20).length }</div>
                        <ul className="space-y-1">
                            {users.filter(u => Number(u.age) >= 20).map((user ,index) => (
                                <li key={user.id} className="text-sm">
                                    {index + 1}.
                                    {user.name} - {user.age}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
