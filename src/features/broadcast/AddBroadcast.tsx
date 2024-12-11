import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/shared/ui/InputField";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/Modal";
import { PlusCircle } from "lucide-react"; // Иконка для создания
import { useGroupsController } from "@/entities/groups/groups.controller";
import Spinner from "@/shared/ui/Spinner";
import { GroupEntity } from "@/entities/groups/entities/group.entity";
import Multiselector from "@/shared/ui/Multiselector";
import { Badge } from "@/shared/ui/badge";
import generateColor from "@/shared/utils/generate-color";
import { CreateBroadcastDto } from "@/entities/broadcasts/dto/create-broadcast.dto";
import { useBroadcastsController } from "@/entities/broadcasts/broadcasts.controller";

const AddBroadcast = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateBroadcastDto>({
    mode: "onChange",
    defaultValues: {
      name: "",
      message: "",
      groupIds: [], // Пустой список групп по умолчанию
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createBroadcast, isCreatingBroadcast } = useBroadcastsController(); // Логика создания рассылки
  const { groups, isGroupsLoading } = useGroupsController(); // Получаем список всех групп
  const [selectedGroups, setSelectedGroups] = useState<GroupEntity[]>([]); // Состояние выбранных групп

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setValue(
      "groupIds",
      selectedGroups.map((group) => group.id)
    ); // Обновляем список групп в форме
  }, [selectedGroups, setValue]);

  const onSubmit: SubmitHandler<CreateBroadcastDto> = async (data) => {
    const broadcastData: CreateBroadcastDto = {
      ...data,
      groupIds: selectedGroups.map((group) => group.id), // Передаем ID групп для рассылки
    };
    await createBroadcast(broadcastData); // Создаем рассылку с данными
    reset(); // Сбросить форму после отправки
    closeModal(); // Закрыть модальное окно
  };

  return (
    <>
      <Button onClick={openModal}>
        <PlusCircle className="w-4 h-4" />
        Создать рассылку
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">Создание новой рассылки</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <InputField
            required
            id="name"
            label="Название рассылки"
            placeholder="Введите название рассылки"
            register={register}
            errors={errors}
            requiredMessage="Введите название рассылки"
          />

          <InputField
            required
            id="message"
            label="Сообщение"
            placeholder="Введите сообщение для рассылки"
            register={register}
            errors={errors}
            requiredMessage="Введите сообщение"
          />

          {isGroupsLoading ? (
            <Spinner />
          ) : (
            <Multiselector
              direction="column"
              initialItems={groups || []}
              selectedItems={selectedGroups}
              onItemSelect={(group) =>
                setSelectedGroups([...selectedGroups, group])
              }
              onItemRemove={(group) =>
                setSelectedGroups(
                  selectedGroups.filter((g) => g.id !== group.id)
                )
              }
              renderItem={(group) => (
                <Badge
                  key={group.id}
                  style={{ backgroundColor: generateColor(group.id) }}
                >
                  {group.name}
                </Badge>
              )}
              selectedLabel="Выбранные группы"
              availableLabel="Доступные группы"
              emptySelectedMessage="Группы не выбраны"
            />
          )}

          <Button type="submit" disabled={isCreatingBroadcast || !isValid}>
            {isCreatingBroadcast ? <Spinner /> : "Создать рассылку"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddBroadcast;
