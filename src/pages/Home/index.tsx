import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinutesAmountInput
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos')
});

type NewCyrcleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch } = useForm<NewCyrcleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  function handleCreateNewCyrcle(data: NewCyrcleFormData) {
    console.log(data);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyrcle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> Começar{' '}
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
