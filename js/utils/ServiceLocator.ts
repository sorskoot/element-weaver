export type ServiceFactory<T> = () => T;
/**
 * Constructor type used as a token for the Service Locator.
 *
 * Use the concrete class constructor when registering or requesting services.
 */
type Constructor<T> = new (...args: any[]) => T;

export class ServiceLocator {
    private readonly services = new Map<Constructor<any>, any>();
    private readonly factories = new Map<Constructor<any>, ServiceFactory<unknown>>();

    registerSingleton<T>(key: Constructor<T>, instance: T): void {
        this.services.set(key, instance);
    }

    registerTransient<T>(key: Constructor<T>, factory: ServiceFactory<T>): void {
        this.factories.set(key, factory);
    }

    get<T>(key: Constructor<T>): T {
        const factory = this.factories.get(key);

        if (factory) {
            return factory() as T;
        }

        const service = this.services.get(key);

        if (!service) {
            throw new Error(`Service not registered`);
        }

        return service as T;
    }
}

export const serviceLocator = new ServiceLocator();
