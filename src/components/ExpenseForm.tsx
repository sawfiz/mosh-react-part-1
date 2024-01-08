import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters."),
  amount: z.number().min(0, "Amount must be positive."),
  category: z.string(),
});

export type FormData = z.infer<typeof schema>;

interface Props {
  categories: string[];
  addExpense: (expense: FormData) => void;
}

const ExpenseForm = ({ categories, addExpense }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    addExpense(data);
  };

  console.log(errors, isValid);
  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-label">Description</label>
      <input
        type="text"
        className="form-control mb-2"
        {...register("description")}
      />
      {errors.description && (
        <p className="text-danger">{errors.description.message}</p>
      )}

      <label className="form-label">Amount</label>
      <input
        type="number"
        className="form-control mb-2"
        {...register("amount", { valueAsNumber: true })}
      />
      {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      <div>
        <select
          className="custom-select custom-select-lg mb-2"
          defaultValue=""
          {...register("category")}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;