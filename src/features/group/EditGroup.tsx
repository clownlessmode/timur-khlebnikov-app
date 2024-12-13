import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/shared/ui/InputField";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/Modal";
import { Settings2 } from "lucide-react";
import { GroupEntity } from "@/entities/groups/entities/group.entity";
import { useUsersController } from "@/entities/users/users.controller";
import { useGroupsController } from "@/entities/groups/groups.controller";
import Spinner from "@/shared/ui/Spinner";
import { UserEntity } from "@/entities/users/entities/user.entity";
import Multiselector from "@/shared/ui/Multiselector";
import { Badge } from "@/shared/ui/badge";
import generateColor from "@/shared/utils/generate-color";
import generateName from "@/shared/utils/generate-name";
import formatPhone from "@/shared/utils/format-phone";

interface Props {
  group: GroupEntity; // Группа, с которой будем работать
}

type FormValues = {
  name: string;
  users: UserEntity[]; // Работаем с пользователями, которые принадлежат группе
};

const EditGroup = ({ group }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: group.name,
      users: group.users, // Начальные пользователи группы
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateGroup, isUpdatingGroup } = useGroupsController(); // Логика обновления группы
  const { users, isUsersLoading } = useUsersController(); // Получаем список всех пользователей
  const [selectedUsers, setSelectedUsers] = useState<UserEntity[]>(
    group.users || []
  ); // Состояние выбранных пользователей

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    reset({
      name: group.name,
      users: group.users,
    });
    setSelectedUsers(group.users); // Обновляем список выбранных пользователей
  }, [group, reset]);

  useEffect(() => {
    setValue("users", selectedUsers); // Обновляем список пользователей в форме
  }, [selectedUsers, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateGroup({
      id: group.id,
      data: { ...data, users: selectedUsers.map((user) => user.id) }, // Передаем id выбранных пользователей
    });
    reset();
    closeModal();
  };

  return (
    <>
      <Button variant="outline" onClick={openModal}>
        <Settings2 className="w-4 h-4" />
        Изменить данные группы
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">Изменение данных группы</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            required={false}
            id="name"
            label="Название"
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

          <Button type="submit" disabled={isUpdatingGroup || !isValid}>
            {isUpdatingGroup ? <Spinner /> : "Обновить"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditGroup;
