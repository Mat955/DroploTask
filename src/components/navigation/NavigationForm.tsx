import {useForm} from "react-hook-form";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import type {NavigationFormData} from "@/types/navigation";

interface NavigationFormProps {
  onSubmit: (data: NavigationFormData) => void;
  onCancel: () => void;
  initialData?: NavigationFormData;
  isEditing?: boolean;
}

export function NavigationForm({
  onSubmit,
  onCancel,
  initialData,
}: NavigationFormProps) {
  const {register, handleSubmit} = useForm<NavigationFormData>({
    defaultValues: initialData,
  });

  return (
    <div className='w-full bg-white rounded-lg border border-[#EAECF0] p-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label
            htmlFor='label'
            className='block text-sm font-medium text-[#344054] mb-1.5'
          >
            Nazwa
          </label>
          <input
            {...register("label", {required: true})}
            type='text'
            id='label'
            placeholder='np. Promocje'
            className='w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-1 focus:ring-[#7F56D9] focus:border-[#7F56D9]'
          />
        </div>

        <div>
          <label
            htmlFor='url'
            className='block text-sm font-medium text-[#344054] mb-1.5'
          >
            Link
          </label>
          <div className='relative'>
            <input
              {...register("url")}
              type='text'
              id='url'
              placeholder='Wklej lub wyszukaj'
              className='w-full pl-11 pr-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-1 focus:ring-[#7F56D9] focus:border-[#7F56D9]'
            />
            <MagnifyingGlassIcon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#667085]' />
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2.5 text-sm font-semibold text-[#344054] hover:bg-gray-50 rounded-lg'
          >
            Anuluj
          </button>
          <button
            type='submit'
            className='px-4 py-2.5 text-sm font-semibold text-[#6941C6] border border-[#D6BBFB] bg-white hover:bg-[#F9F5FF] rounded-lg'
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}
