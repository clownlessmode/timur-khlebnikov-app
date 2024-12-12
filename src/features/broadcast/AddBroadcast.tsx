import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
import { Input } from "@/shared/ui/input";

const AddBroadcast = () => {
  const {
    control,
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
      groupIds: [],
      images: [],
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createBroadcast, isCreatingBroadcast } = useBroadcastsController(); // Логика создания рассылки
  const { groups, isGroupsLoading } = useGroupsController(); // Получаем список всех групп
  const [selectedGroups, setSelectedGroups] = useState<GroupEntity[]>([]); // Состояние выбранных групп

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setSelectedGroups([]);
  };

  useEffect(() => {
    setValue(
      "groupIds",
      selectedGroups.map((group) => group.id)
    );
  }, [selectedGroups, setValue]);

  const onSubmit: SubmitHandler<CreateBroadcastDto> = async (data) => {
    console.log("DATA: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    data.groupIds.forEach((id) => formData.append("groupIds", id));

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    await createBroadcast(formData);
    closeModal();
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
            <Controller
              control={control}
              name="groupIds"
              render={() => (
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
            />
          )}

          <Controller
            control={control}
            name="images"
            render={({ field: { onChange } }) => (
              <Input
                className="h-13"
                type="file"
                multiple
                onChange={(e) => {
                  onChange(e.target.files);
                }}
              />
            )}
          />

          <Button type="submit" disabled={isCreatingBroadcast || !isValid}>
            {isCreatingBroadcast ? <Spinner /> : "Создать рассылку"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddBroadcast;
