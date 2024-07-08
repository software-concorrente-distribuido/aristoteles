from multiprocessing.managers import BaseManager
from multiprocessing import Queue, Semaphore, Barrier, Event
import threading
import multiprocessing as mp
from time import sleep
from random import randint

ITEMS = ["A", "B", "C", "D", "E"]

HOST = ""
PORT = 6002
AUTH_KEY = b"senha"
BUFFER_SIZE = 10


def produtor(address, authkey, empty, full):
    QueueManager.register("get_queue")
    QueueManager.register("get_empty")
    QueueManager.register("get_full")
    QueueManager.register("get_barrier")

    m = QueueManager(address=address, authkey=authkey)
    m.connect()
    queue = m.get_queue()
    empty = m.get_empty()
    full = m.get_full()

    while True:
        empty.acquire()
        sleep(0.5)
        item = ITEMS[randint(0, len(ITEMS) - 1)]
        queue.put(item)
        print(f"Produtor colocou o item: {item}")
        full.release()
        # barrier.wait()


def consumidor(address, authkey, empty, full):
    QueueManager.register("get_queue")
    QueueManager.register("get_empty")
    QueueManager.register("get_full")
    QueueManager.register("get_barrier")

    m = QueueManager(address=address, authkey=authkey)
    m.connect()
    queue = m.get_queue()
    empty = m.get_empty()
    full = m.get_full()

    while True:
        full.acquire()
        sleep(0.5)
        item = queue.get()
        print(f"Consumidor retirou o item: {item}")
        empty.release()


if __name__ == "__main__":
    address = (HOST, PORT)
    queue = Queue(BUFFER_SIZE)
    empty = Semaphore(BUFFER_SIZE)
    full = Semaphore(1)
    barrier = Barrier(2)

    class QueueManager(BaseManager):
        pass

    QueueManager.register("get_queue", callable=lambda: queue)
    QueueManager.register("get_empty", callable=lambda: empty)
    QueueManager.register("get_full", callable=lambda: full)
    QueueManager.register("get_barrier", callable=lambda: barrier)

    server_ready = Event()

    m = QueueManager(address=address, authkey=AUTH_KEY)

    server_thread = threading.Thread(
        target=lambda: m.get_server().serve_forever(), args=()
    )
    server_thread.daemon = True
    server_thread.start()
    server_ready.set()
    server_ready.wait()

    produtor_process = mp.Process(
        target=produtor, args=(address, AUTH_KEY, empty, full)
    )
    consumidor_process = mp.Process(
        target=consumidor, args=(address, AUTH_KEY, empty, full)
    )

    produtor_process.start()
    consumidor_process.start()

    produtor_process.join()
    consumidor_process.join()
