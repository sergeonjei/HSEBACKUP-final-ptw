'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray, FieldArrayWithId } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
type RiskLevel = typeof riskLevels[number];

const hazardSchema = z.object({
  type: z.string().min(1, 'Hazard type is required'),
  description: z.string().min(1, 'Description is required'),
  consequences: z.string().min(1, 'Consequences are required'),
  likelihood: z.number().min(1).max(5),
  severity: z.number().min(1).max(5),
  controlMeasures: z.array(z.string().min(1, 'Control measure is required')),
});

const riskAssessmentSchema = z.object({
  permitId: z.string(),
  hazards: z.array(hazardSchema).min(1, 'At least one hazard must be identified'),
});

type RiskAssessmentFormData = z.infer<typeof riskAssessmentSchema>;
type Hazard = z.infer<typeof hazardSchema>;

interface RiskAssessmentFormProps {
  permitId: string;
}

interface HazardField extends FieldArrayWithId<RiskAssessmentFormData, 'hazards', 'id'> {
  controlMeasures: string[];
}

export default function RiskAssessmentForm({ permitId }: RiskAssessmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RiskAssessmentFormData>({
    resolver: zodResolver(riskAssessmentSchema),
    defaultValues: {
      permitId,
      hazards: [
        {
          type: '',
          description: '',
          consequences: '',
          likelihood: 1,
          severity: 1,
          controlMeasures: [''],
        },
      ],
    },
  });

  const { fields: hazards, append: appendHazard, remove: removeHazard } = useFieldArray({
    control,
    name: 'hazards',
  });

  const calculateRiskLevel = (likelihood: number, severity: number): RiskLevel => {
    const riskScore = likelihood * severity;
    if (riskScore >= 15) return 'CRITICAL';
    if (riskScore >= 10) return 'HIGH';
    if (riskScore >= 5) return 'MEDIUM';
    return 'LOW';
  };

  const onSubmit = async (data: RiskAssessmentFormData) => {
    try {
      setIsSubmitting(true);
      const riskLevel = data.hazards.reduce<RiskLevel>((highest, hazard) => {
        const current = calculateRiskLevel(hazard.likelihood, hazard.severity);
        return riskLevels.indexOf(current) > riskLevels.indexOf(highest) ? current : highest;
      }, 'LOW');

      const response = await fetch('/api/risk-assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          riskLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit risk assessment');
      }

      router.refresh();
      router.push(`/permits/${permitId}`);
    } catch (error) {
      console.error('Error submitting risk assessment:', error);
      alert('Failed to submit risk assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        {hazards.map((field: HazardField, index: number) => (
          <div key={field.id} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Hazard #{index + 1}</h4>
              {hazards.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHazard(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove Hazard
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hazard Type
                </label>
                <input
                  type="text"
                  {...register(`hazards.${index}.type`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.hazards?.[index]?.type && (
                  <p className="mt-1 text-sm text-red-600">
                    Hazard type is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register(`hazards.${index}.description`)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.hazards?.[index]?.description && (
                  <p className="mt-1 text-sm text-red-600">
                    Description is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Consequences
                </label>
                <textarea
                  {...register(`hazards.${index}.consequences`)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.hazards?.[index]?.consequences && (
                  <p className="mt-1 text-sm text-red-600">
                    Consequences are required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Likelihood (1-5)
                  </label>
                  <select
                    {...register(`hazards.${index}.likelihood`, { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Severity (1-5)
                  </label>
                  <select
                    {...register(`hazards.${index}.severity`, { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Control Measures
                </label>
                <div className="mt-2 space-y-2">
                  {field.controlMeasures.map((_, measureIndex) => (
                    <div key={measureIndex} className="flex gap-2">
                      <input
                        type="text"
                        {...register(`hazards.${index}.controlMeasures.${measureIndex}`)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {field.controlMeasures.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newControlMeasures = [...field.controlMeasures];
                            newControlMeasures.splice(measureIndex, 1);
                            field.controlMeasures = newControlMeasures;
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newControlMeasures = [...field.controlMeasures, ''];
                      field.controlMeasures = newControlMeasures;
                    }}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add Control Measure
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() =>
            appendHazard({
              type: '',
              description: '',
              consequences: '',
              likelihood: 1,
              severity: 1,
              controlMeasures: [''],
            })
          }
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Another Hazard
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Risk Assessment'}
        </button>
      </div>
    </form>
  );
} 