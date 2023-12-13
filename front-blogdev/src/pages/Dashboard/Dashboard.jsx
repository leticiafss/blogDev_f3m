import React from 'react';
import styles from './Dashboard.module.css';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const docCollection = 'posts';
  const { documents, error, loading } = userFetchDocuments(docCollection, null, user.uid);

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      <div className={styles.post_header}>
        <span>Título</span>
        <span>Ações</span>
      </div>
      {documents && documents.map((doc, index) => (
        <div className={styles.post_row} key={index}>
          <p>{doc.title}</p>
          <div>
            <a className="btn btn-outline" href={`/posts/${doc.id}`}>Ver</a>
            <a className="btn btn-outline" href={`/posts/edit/${doc.id}`}>Editar</a>
            <button className="btn btn-outline btn-danger">Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;