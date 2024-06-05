'use client'
import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase';
import CountdownTimer from '../../../components/countdownTimer';

interface EventData {
  id: string;
  event_name: string;
  friend_name: string;
  event_date: string;
}

export default function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching event data:', error);
        } else {
          setEventData(data as EventData);
        }
      }
    };

    fetchEventData();
  }, [id]);

  if (!eventData) {
    return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🎉 Hey {eventData.friend_name}!</h1>
        <p className="text-xl mb-8 text-gray-700">
          I can't wait for <span className="font-semibold">{eventData.event_name}</span>. Here is a countdown to remind you:
        </p>
        <CountdownTimer targetDate={new Date(eventData.event_date)} />
      </div>
    </main>
  );
}
