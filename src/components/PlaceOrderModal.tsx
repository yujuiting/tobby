import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Good,
  PlaceOrderParams,
  usePlaceOrderMutation,
  UserInfo,
} from "store/api";

export interface PlaceOrderModalProps extends Omit<ModalProps, "children"> {
  user: UserInfo;
  good: Good;
}

export default function PlaceOrderModal({
  user,
  good,
  ...rest
}: PlaceOrderModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<PlaceOrderParams>({
    defaultValues: {
      goods: [good],
      userID: user.userID,
      phone: user.phone,
      email: user.email,
    },
    mode: "onChange",
  });

  const [placeOrder, placeOrderResponse] = usePlaceOrderMutation();

  const submit = handleSubmit(async (order) => {
    await placeOrder({ accessToken: user.accessToken, order });
  });

  useEffect(() => {
    if (placeOrderResponse.status === QueryStatus.fulfilled) {
      rest.onClose();
    }
  }, [placeOrderResponse, rest.onClose]);

  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={submit}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input {...register("name", { required: true })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input {...register("phone", { required: true })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input {...register("email", { required: true })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input {...register("address", { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Input {...register("comment")} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              isLoading={isSubmitting}
            >
              Order
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
