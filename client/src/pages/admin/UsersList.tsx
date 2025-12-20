import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import type { UserType } from "../../typescript/user";
import { useState } from "react";
import { createUser, deleteUser, editUser } from "../../api/user.api";
import Modal from "../../components/Modal";
import UserForm from "../../components/form/userForm";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

type UserListProps = {
  users: UserType[];
};

const UserList = ({ users }: UserListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<UserType | null>(null);
  const [deleting, setDeleting] = useState<UserType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreateModal = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserType) => {
    setEditing(user);
    setIsModalOpen(true);
  };

  const openDeleteModal = (user: UserType) => {
    setDeleting(user);
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    try {
      setDeleteLoading(true);
      await deleteUser(deleting?._id);
      setDeleting(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleCreate = (data: Partial<UserType>) => {
    console.log(data);
    createUser(data);
    window.location.reload();
  };

  const handleUpdate = (data: Partial<UserType>) => {
    editUser(editing?._id as string, data);
    setEditing(null);
    window.location.reload();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl"># La liste des utilisateurs</h1>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div>
            <button onClick={openCreateModal} className="btn btn-primary">
              Ajouter un nouveau utilisateur
            </button>
          </div>
          <div className="bg-base-200">
            <select
              name="filter"
              id="filter"
              className="select select-bordered"
            >
              <option value="tous">Tous</option>
              <option value="employe">Employe</option>
              <option value="gestionnaire">Gestionnaire</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search ..."
              className="border border-white rounded-xl p-2"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {users.length === 0 ? (
          <p className="text-gray-500">Aucune demande enregistrée</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>NOM</th>
                <th>PRENOM</th>
                <th>EMAIL</th>
                <th>SOLDE</th>
                <th>ADRESSE</th>
                <th>ROLE</th>
                <th>DATE DE CRÉATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index: number) => {
                return (
                  <tr key={index}>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>{user.soldeConges}</td>
                    <td> {user.adresse} </td>
                    <td> {user.role} </td>
                    <td> {user.createdAt} </td>
                    <td className="flex justify-end gap-2">
                      <button
                        className="btn btn-primary text-white"
                        onClick={() => openEditModal(user)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="btn btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserForm
          initialData={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </>
  );
};

export default UserList;
