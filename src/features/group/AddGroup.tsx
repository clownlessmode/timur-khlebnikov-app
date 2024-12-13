import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/shared/ui/InputField";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/Modal";
import { PlusCircle } from "lucide-react"; // Иконка для создания
import { useUsersController } from "@/entities/users/users.controller";
import { useGroupsController } from "@/entities/groups/groups.controller";
import Spinner from "@/shared/ui/Spinner";
import { UserEntity } from "@/entities/users/entities/user.entity";
import Multiselector from "@/shared/ui/Multiselector";
import { Badge } from "@/shared/ui/badge";
import generateColor from "@/shared/utils/generate-color";
import generateName from "@/shared/utils/generate-name";
import formatPhone from "@/shared/utils/format-phone";
import { CreateGroupDto } from "@/entities/groups/dto/create-group.dto";

const AddGroup = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateGroupDto>({
    mode: "onChange",
    defaultValues: {
      name: "",
      users: [], // Пустой список пользователей по умолчанию
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createGroup, isCreatingGroup } = useGroupsController(); // Логика создания группы
  const { users, isUsersLoading } = useUsersController(); // Получаем список всех пользователей
  const [selectedUsers, setSelectedUsers] = useState<UserEntity[]>([]); // Состояние выбранных пользователей

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setValue(
      "users",
      selectedUsers.map((user) => user.id)
    ); // Обновляем список пользователей в форме
  }, [selectedUsers, setValue]);

  const onSubmit: SubmitHandler<CreateGroupDto> = async (data) => {
    const groupData: CreateGroupDto = {
      ...data,
      users: selectedUsers.map((user) => user.id), // Передаем ID пользователей
    };
    await createGroup(groupData); // Создаем группу с данными
    reset(); // Сбросить форму после отправки
    closeModal(); // Закрыть модальное окно
  };

  return (
    <>
      <Button onClick={openModal}>
        <PlusCircle className="w-4 h-4" />
        Добавить группу
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">Создание новой группы</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <InputField
            required
            id="name"
            label="Название группы"
            placeholder="Введите название группы"
            register={register}
            errors={errors}
            requiredMessage="Введите название группы"
          />

          {isUsersLoading ? (
            <Spinner />
          ) : (
            <Multiselector
              direction="column"
              initialItems={users || []}
              selectedItems={selectedUsers}
              onItemSelect={(user) =>
                setSelectedUsers([...selectedUsers, user])
              }
              onItemRemove={(user) =>
                setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
              }
              renderItem={(user) => (
                <Badge
                  key={user.id}
                  style={{ backgroundColor: generateColor(user.id) }}
                >
                  {generateName({
                    last_name: user.telegram.last_name,
                    first_name: user.telegram.first_name,
                    username: user.telegram.username,
                    id: user.id,
                    name: user.name,
                  })}{" "}
                  - {formatPhone(user.telephone)}
                </Badge>
              )}
              selectedLabel="Выбранные пользователи"
              availableLabel="Доступные пользователи"
              emptySelectedMessage="Пользователи не выбраны"
            />
          )}

          <Button type="submit" disabled={isCreatingGroup || !isValid}>
            {isCreatingGroup ? <Spinner /> : "Создать группу"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddGroup;
