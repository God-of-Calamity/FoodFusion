import { Fragment, useRef, useState } from 'react';

import classes from './AddItemForm.module.css';

function AddItemForm(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const timeInputRef = useRef();
    const ingredientsInputRef = useRef();
    const methodInputRef = useRef();
    const tagsInputRef = useRef();
    const imageFileInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        formData.append('restaurentName', userData.restaurentName);
        formData.append('userName', userData.userName);
        formData.append('ownerId', userData._id);
        formData.append('foodName', nameInputRef.current.value);
        formData.append('price', priceInputRef.current.value);
        formData.append('time', timeInputRef.current.value);
        formData.append('ingredients', ingredientsInputRef.current.value);
        formData.append('method', methodInputRef.current.value);
        formData.append('tags', tagsInputRef.current.value);
        formData.append('imageFile', imageFileInputRef.current.files[0]);

        props.setToTrue();
        setErrorMessage('');
        const response = await fetch('http://localhost:4000/foods/addItem', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const responseData = await response.json();
            setErrorMessage(responseData.error);
        }
        console.log('hi');
        props.setToFalse();
        return null;
    }

    return (
        <Fragment>
            <form method="POST" onSubmit={submitHandler}>
                <img className={classes.img} src="/images/form_image.PNG" alt="form_image" />

                {errorMessage.length > 0 ? <p className={classes.errorControl}>{errorMessage}</p> : ''}

                <input ref={nameInputRef} className={classes.input} type="text" placeholder="Name of Food" name="foodName" id="name" required autoFocus />
                <br />
                <input ref={priceInputRef} className={classes.input} type="text" placeholder="Price" name="price" id="price" required />
                <br />
                <input ref={timeInputRef} className={classes.input} type="text" placeholder="Time" name="time" id="time" required />
                <br />
                <input ref={ingredientsInputRef} className={classes.input} type="text" placeholder="Ingredients" name="ingredients" id="ingredients" required />
                <br />
                <input ref={methodInputRef} className={classes.input} type="text" placeholder="Method" name="method" id="method" required />
                <br />
                <input ref={tagsInputRef} className={classes.input} type="text" placeholder="Tags" name="tags" id="tags" required />

                <input ref={imageFileInputRef} className={classes.file} type="file" placeholder="Image-Location" name="imageFile" id="img-src" required />
                <button className={`${classes.input} ${classes['add_button']}`} type="submit">ADD</button>
            </form>
        </Fragment>
    );
}

export default AddItemForm;