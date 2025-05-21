export function getTodayRange(): { start: Date; end: Date } {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date();

  // Dia da semana atual (0 = domingo, 1 = segunda, ... 6 = sábado)
  const dayOfWeek = now.getDay();

  // Calcula o domingo da semana atual (start)
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  // Calcula o sábado da semana atual (end)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getCurrentMonthRange(): { start: Date; end: Date } {
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const end = new Date()
  end.setMonth(end.getMonth() + 1)
  end.setDate(0)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}
