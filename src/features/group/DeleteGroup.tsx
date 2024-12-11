"use client";
import { GroupEntity } from "@/entities/groups/entities/group.entity";
import { useGroupsController } from "@/entities/groups/groups.controller";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/Modal";
import Spinner from "@/shared/ui/Spinner";
import { Trash } from "lucide-react";
import React, { useState } from "react";
interface Props {
  group: GroupEntity;
}
const DeleteGroup = ({ group }: Props) => {
  const { deleteGroup, isDeletingGroup } = useGroupsController();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async () => {
    await deleteGroup({ id: group.id });
    closeModal();
  };
  return (
    <>
      <Button variant="destructive" onClick={openModal}>
        <Trash className="w-4 h-4" />
        Удалить из списка
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">Вы уверены?</h2>
        <Button
          className="w-full"
          variant={"destructive"}
          type="submit"
          onClick={onSubmit}
          disabled={isDeletingGroup}
        >
          {isDeletingGroup ? <Spinner /> : "Удалить"}
        </Button>
      </Modal>
    </>
  );
};

export default DeleteGroup;
