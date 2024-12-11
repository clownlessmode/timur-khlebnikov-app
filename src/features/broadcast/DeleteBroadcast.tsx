"use client";
import { useBroadcastsController } from "@/entities/broadcasts/broadcasts.controller";
import { BroadcastEntity } from "@/entities/broadcasts/entities/broadcast.entity";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/Modal";
import Spinner from "@/shared/ui/Spinner";
import { Trash } from "lucide-react";
import React, { useState } from "react";
interface Props {
  broadcast: BroadcastEntity;
}
const DeleteBroadcast = ({ broadcast }: Props) => {
  const { deleteBroadcast, isDeletingBroadcast } = useBroadcastsController();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async () => {
    await deleteBroadcast({ id: broadcast.id });
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
          disabled={isDeletingBroadcast}
        >
          {isDeletingBroadcast ? <Spinner /> : "Удалить"}
        </Button>
      </Modal>
    </>
  );
};

export default DeleteBroadcast;
