import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/shared/ui/InputField";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/Modal";
import { Settings2 } from "lucide-react";
import { UserEntity } from "@/entities/users/entities/user.entity";
import { useUsersController } from "@/entities/users/users.controller";
import { useGroupsController } from "@/entities/groups/groups.controller";
import Spinner from "@/shared/ui/Spinner";
import { GroupEntity } from "@/entities/groups/entities/group.entity";
import Multiselector from "@/shared/ui/Multiselector";
import { Badge } from "@/shared/ui/badge";
import generateColor from "@/shared/utils/generate-color";

interface Props {
  user: UserEntity;
}

type FormValues = {
  name: string;
  telephone: string;
  region: string;
  comment: string;
  groups: GroupEntity[];
};

const EditUser = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: user.name,
      telephone: user.telephone,
      region: user.region,
      comment: user.comment,
      groups: user.groups,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateUser, isUpdatingUser } = useUsersController();
  const { groups, isGroupsLoading } = useGroupsController();
  const [selectedGroups, setSelectedGroups] = useState<GroupEntity[]>(
    user.groups
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    reset({
      name: user.name,
      telephone: user.telephone,
      region: user.region,
      comment: user.comment,
      groups: user.groups,
    });
    // Обновляем selectedGroups также
    setSelectedGroups(user.groups);
  }, [user, reset]);

  useEffect(() => {
    setValue("groups", selectedGroups);
  }, [selectedGroups, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateUser({
      id: user.id,
      data: { ...data, groups: selectedGroups.map((g) => g.id) },
    });
    reset();
    closeModal();
  };

  return (
    <>
      <Button variant="outline" onClick={openModal}>
        <Settings2 className="w-4 h-4" />
        Изменить данные
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">
          Изменение данных пользователя
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            required={false}
            id="name"
            label="Имя"
            placeholder="Введите имя пользователя"
            register={register}
            errors={errors}
            requiredMessage="Введите имя пользователя"
          />
          <InputField
            required={false}
            id="telephone"
            label="Телефон"
            placeholder="Введите телефон"
            register={register}
            errors={errors}
            requiredMessage="Введите телефон"
          />
          <InputField
            required={false}
            id="region"
            label="Регион"
            placeholder="Введите регион"
            register={register}
            errors={errors}
            requiredMessage="Введите регион"
          />
          <InputField
            required={false}
            id="comment"
            label="Комментарий"
            placeholder="Введите комментарий"
            register={register}
            errors={errors}
            requiredMessage="Введите комментарий"
          />

          {isGroupsLoading ? (
            <Spinner />
          ) : (
            <Multiselector
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

          <Button type="submit" disabled={isUpdatingUser || !isValid}>
            {isUpdatingUser ? <Spinner /> : "Обновить"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditUser;
