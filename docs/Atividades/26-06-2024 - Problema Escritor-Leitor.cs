using System;
using System.Threading;

// Implementação que demonstra uma solução do problema escritor-leitor com prioridade aos leitores.

class EscritorLeitor
{
    // Recurso compartilhado
    private static int sharedResource = 0;
    private static int readCount = 0;

    // Locks
    private static readonly object readLock = new object();
    private static readonly Mutex writeLock = new Mutex();

    static void Main(string[] args)
    {
        Thread[] readers = new Thread[5];
        Thread[] writers = new Thread[2];

        for (int i = 0; i < readers.Length; i++)
        {
            readers[i] = new Thread(Reader);
            readers[i].Start();
        }

        for (int i = 0; i < writers.Length; i++)
        {
            writers[i] = new Thread(Writer);
            writers[i].Start();
        }

        foreach (Thread reader in readers)
        {
            reader.Join();
        }

        foreach (Thread writer in writers)
        {
            writer.Join();
        }
    }

    public static void Reader()
    {
        while (true)
        {
            lock (readLock)
            {
                readCount++;
                if (readCount == 1)
                {
                    writeLock.WaitOne();
                }
            }

            // Leitura do recurso compartilhado
            Console.WriteLine($"Reading resource: {sharedResource}");

            lock (readLock)
            {
                readCount--;
                if (readCount == 0)
                {
                    writeLock.ReleaseMutex();
                }
            }

            Thread.Sleep(100); // Simula tempo de leitura
        }
    }

    public static void Writer()
    {
        while (true)
        {
            writeLock.WaitOne();

            // Escrita no recurso compartilhado
            sharedResource++;
            Console.WriteLine($"Writing resource: {sharedResource}");

            writeLock.ReleaseMutex();

            Thread.Sleep(100); // Simula tempo de escrita
        }
    }
}
