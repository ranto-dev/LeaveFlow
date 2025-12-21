/**
 * Composant: Tableau pour lister les utiisateurs
 */
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import type { UserType } from "../../typescript/user";
import { useMemo, useState } from "react";
import { createUser, deleteUser, editUser } from "../../api/user.api";
import Modal from "../Modal";
import UserForm from "../form/userForm";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

type UserListProps = {
  users: UserType[];
};

const UserList = ({ users }: UserListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<UserType | null>(null);
  const [deleting, setDeleting] = useState<UserType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState<"createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter((l) =>
        `${l.nom} ${l.prenom}`.toLowerCase().includes(s)
      );
    }

    if (typeFilter) {
      result = result.filter((l) => l.role === typeFilter);
    }

    result.sort((a, b) => {
      const d1 = new Date(a[sortKey]).getTime();
      const d2 = new Date(b[sortKey]).getTime();
      return sortOrder === "asc" ? d1 - d2 : d2 - d1;
    });

    return result;
  }, [users, search, typeFilter, sortKey, sortOrder]);

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
    <div className="flex flex-col gap-4">
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
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un nom ou une prénom"
          className="input input-bordered w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Tous les types</option>
          <option value="ADMIN">ADMIN</option>
          <option value="GESTIONNAIRE">GESTIONNAIRE</option>
          <option value="EMPLOYE">EMPLOYE</option>
        </select>

        <select
          className="select select-bordered"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as never)}
        >
          <option value="soldeConges">Triage par solde</option>
          <option value="createdAt">Tirage par Date de création</option>
        </select>

        <button
          className="btn btn-outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Triage {sortOrder === "asc" ? "Ascendant" : "Descendant"}
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {filteredUsers.length === 0 ? (
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
              {filteredUsers.map((user, index: number) => {
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
    </div>
  );
};

export default UserList;
