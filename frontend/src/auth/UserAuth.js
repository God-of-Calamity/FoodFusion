import { redirect } from 'react-router-dom';

export async function loader() {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!token)
        return redirect('/login');
    if (!userData)
        return redirect('/login');

    const response = await fetch(`http://localhost:4000/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        return redirect('/login');
    }

    return null;
}