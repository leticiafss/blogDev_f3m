import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { userInsertDocument } from "../../hooks/userInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = userInsertDocument("posts");

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, image, body, tags };
    console.log(newPost);

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if(!title || !image || !body || !tags) {
      setFormError("Por favor, preencha com atenção todos os campos!")
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    });
    if (formError) return;

    try {
      await insertDocument({
        title,
        image,
        body,
        tags: tagsArray,
        uid: user.uid,
        createBy: user.displayName,
      });
      navigate("/");  
    }catch(error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className={styles.create_post}>
        <h2>Novo Postagem</h2>
        <p>Compartilhe sua experiência no mundo desenvolvedor.</p>
        <form onSubmit={handlerSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Título da postagem"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Endereço da imagem da postagem"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              required
            />
          </label>
          <label>
            <span>Conteúdo da postagem:</span>
            <textarea
              name="body"
              id="body"
              placeholder="Insira o conteúdo de sua postagem aqui"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              required
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Insira suas Tags separadas por vírgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              required
            />
          </label>
          {!response.loading && <button className="btn">Criar Postagem</button>}
          {response.loading && <button className="btn">Postando...</button>}
          {response.error && <p className="error">{response.error || formError}</p>}
        </form>
      </div>
    </>
  );
};

export default CreatePost;
